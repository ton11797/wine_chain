import Running_Number from './util/runningNumber'
import DB from '../common/dynamoDBManager'
import * as AWS from 'aws-sdk'
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