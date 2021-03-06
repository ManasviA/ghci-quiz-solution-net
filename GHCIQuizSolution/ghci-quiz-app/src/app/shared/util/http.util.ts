import { Observable } from 'rxjs/observable';
import * as Rx from 'rxjs/Rx';

//declare function mapJson(res) => res.json()

declare var _;

export class HttpUtil {
	public static mapJson<T>(res) {
		return res.json() as T;
	}

	public static handleErrorWithMessage(toasterService: any): (error: any) => Promise<any> {
		return (error) : Promise<any> => {
			return HttpUtil.handleError(error, toasterService);
		}
	}

	public static handleSuccessWithMessag(toasterService: any): (res: any) => void {
		return (res) : void => HttpUtil.handleSuccess(res, toasterService);
	}

	public static handleSuccess(res, toasterService) {
		toasterService.pop('success', "Update", "Updated data successfully");
	}

	public static handleError(error: any, toasterService?): Promise<any> {
		let errorJson;
		try {
			errorJson = error.json();			
		} catch (error) {
			errorJson = { Message: error }
		}
		// let errMsg = (error.message) ? error.message :
		// 	error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		// console.error(errMsg); // log to console
		if(toasterService) {
			toasterService.pop("error", errorJson.Message, errorJson.ExceptionMessage);
		}
		return Promise.reject(errorJson.Message);
	}

	public static mapJsonAndStatus<T>(checkUpdate, res) {
		let retRes = res.json();
		if (retRes['nModified'] && retRes['n'] && retRes['ok']) {
			if (checkUpdate && retRes['nModified'] < 1) {
				return Rx.Observable.throw(retRes);
			}
		}
		return retRes as T;
	}
}