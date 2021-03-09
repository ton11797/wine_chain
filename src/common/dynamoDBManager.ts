import * as AWS from 'aws-sdk'
export default class DynamoManager {
    private tableName:string
    private dynamo:AWS.DynamoDB.DocumentClient

    constructor(tableName:string){
        this.tableName = tableName
        this.dynamo = new AWS.DynamoDB.DocumentClient();
    }

    public async saveItem(item){
        console.log("save")
        const params = {
            TableName: this.tableName,
            Item: item
        };
        return await this.dynamo
		.put(params)
		.promise()
		.then((result) => {
			return result;
		}, (error) => {
			return error;
		});
    }
    
    public async getItem(Key){
        const params = {
            Key,
            TableName: this.tableName
        };
        return await this.dynamo
		.get(params)
		.promise()
		.then((result) => {
			return result.Item;
		}, (error) => {
			return error;
		});
    }

    public async deleteItem(Key){
        const params = {
            Key,
            TableName: this.tableName
        };
        return await this.dynamo.delete(params).promise();
    }

}
