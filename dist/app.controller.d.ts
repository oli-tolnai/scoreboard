import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getMainDisplay(): {
        message: string;
    };
    getAdmin(): {
        message: string;
    };
}
