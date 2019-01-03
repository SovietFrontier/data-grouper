import * as Map from 'core-js/es6/map';

export class Grouper {
	private _dataGrouping: string | number | symbol;
	private _sumProperties: (string | number | symbol)[] = [];
	private _avgProperties: (string | number | symbol)[] = [];
	private _includeGroup: (string | number | symbol)[] = [];
	private _customProperties: Map<string, (row: any) => any> = new Map<string, (row: any) => any>();

	constructor(private data: any[]) { }

	groupBy(dataGrouping: string | number | symbol): this {
		this._dataGrouping = dataGrouping;
		return this;
	}

	include(...includeGroup: (string | number | symbol)[]): this {
		this._includeGroup = includeGroup;
		return this;
	}

	aggSum(...sumProperties: (string | number | symbol)[]): this {
		this._sumProperties = sumProperties;
		return this;
	}

	aggAvg(...avgProperties: (string | number | symbol)[]): this {
		this._avgProperties = avgProperties;
		return this;
	}

	custom(propertyName: string, callback: (row: any) => any): this {
		this._customProperties.set(propertyName, callback);
		return this;
	}

	group(): any[] {
		let result: any[] = [];
		let map = new Map<any, any[]>();

		for (let row of this.data) {
			let key = row[this._dataGrouping];
			if (map.get(key) === undefined) {
				map.set(key, []);
			}
			map.get(key).push(row);
		}

		map.forEach((rows, key) => {
			let dataObject: any = {};
			dataObject[this._dataGrouping] = key;

			for (let row of rows) {


				//adding included non aggregate columns
				for (let includeProperty of this._includeGroup) {
					dataObject[includeProperty] = row[includeProperty];
				}

				//summing up groupings
				for (let sumProperty of this._sumProperties) {
					if (dataObject[sumProperty.toString() + 'Sum'] === undefined) {
						dataObject[sumProperty.toString() + 'Sum'] = 0;
					}

					dataObject[sumProperty.toString() + 'Sum'] += row[sumProperty];
				}

				//summing up average groupings
				for (let avgProperty of this._avgProperties) {
					if (dataObject[avgProperty.toString() + 'Avg'] === undefined) {
						dataObject[avgProperty.toString() + 'Avg'] = 0;
					}

					dataObject[avgProperty.toString() + 'Avg'] += row[avgProperty];
				}
			}

			//averaging groupings
			for (let avgProperty of this._avgProperties) {
				dataObject[avgProperty.toString() + 'Avg'] = dataObject[avgProperty.toString() + 'Avg'] / rows.length;
			}

			result.push(dataObject);
		});

		for (let row of result) {
			this._customProperties.forEach((callback, key) => {
				row[key] = callback(row);
			});
		}

		return result;
	}
}