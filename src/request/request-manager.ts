import { Request } from "./request.js";
import { consoleOutput } from "../view/console-output.js";
import { colors, sleep } from "../util.js";

export class RequestManager {

    private originalResponse: string;
    
    private responseChanged = false;

    constructor (private request: Request, private timeout: number) { }

    public async run() {
        while (true) {
            const response = await this.request.makeRequest();

            if(!this.originalResponse) {
                this.originalResponse = response;
            }

            const sameAsInitial = response === this.originalResponse;

            // If responseChanged has ever been true, it should stay.
            // Otherwise set it based on whether this response is the same as initial;
            this.responseChanged = this.responseChanged || !sameAsInitial;

            consoleOutput.WriteLines([
            `${new Date().toISOString()} - ${this.getStatusTag(!sameAsInitial)}`,
            ...response.split('\n')
            ]);

            await sleep(this.timeout * 1000);
        }
    }

    private getStatusTag(changed: boolean): string {
        if (changed) {
            return colors.bold(colors.green('Changed'));
        }
        return `${colors.magenta("Original")} ${this.responseChanged ? '(Changed Back)' : ''}`;
    }
}