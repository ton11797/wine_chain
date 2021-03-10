import Running_Number from './util/runningNumber'
import DB from '../common/dynamoDBManager'
import * as AWS from 'aws-sdk'
import {serialGeneratorBase} from "../common/model/serialGenerator"
import { plainToClassFromExist } from 'class-transformer';
import { validate } from 'class-validator';
import {config} from '../common/config/typeORM'
import {createConnection, getRepository} from "typeorm";
import {AppConfig} from "../common/entity/app-config.entity";

export const serialGeneratorFunction = async (event: any) => {
	console.log(`serialGeneratorFunction: input ${JSON.stringify(event, null, 4)}`);
	let db = new DB('wine_serial')
	for(let i =0;i<event.Records.length;i++){
		const { body } = event.Records[i];
		let Jsonbody = JSON.parse(body)
		let running_Number:Running_Number = new Running_Number()
		for(let i=0;i<Jsonbody.bottle_count;i++){
			let newRecord = {...Jsonbody,running_number:running_Number.print_running_number()}
			await db.saveItem(newRecord)
			running_Number.increment();
		}
	};
	return {};
};

export const serialGeneratorGet = async (event: any) => {
	console.log(`serialGeneratorGet: input ${JSON.stringify(event, null, 4)}`);

	return {};
};

export const serialGeneratorPost = async (event: any) => {
	const connection = await createConnection({
		type: "postgres",
		host: process.env.PGHOST,
		port: parseInt(process.env.PGPORT),
		username: process.env.PGUSER,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
		synchronize: true,
		logging: false,
		entities: [__dirname + '/../**/*.entity{.ts,.js}']
	});
	const userRepository = getRepository(AppConfig); // you can also get it via getConnection().getRepository() or getManager().getRepository()
	console.log(`serialGeneratorPost: input ${JSON.stringify(event, null, 4)}`);
	let serialGenerator = new serialGeneratorBase();
	serialGenerator = plainToClassFromExist(serialGenerator,JSON.parse(event.body))
	let validateResult = await validate(serialGenerator)
	if(validateResult.length >0){
		return {statusCode:400,body:JSON.stringify({validator:validateResult})};
	}
	
};