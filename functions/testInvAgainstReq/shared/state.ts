import { ReservEvent } from './reservEvent';
import { TestStatus } from './teststatus';

export interface State {
    originalQueue: ReservEvent[];
    deferredQueue: ReservEvent[];
    currentInv: number;
    test: {
        status: TestStatus,
        lastTestResult: Boolean,
        lastCheckedTime: Date
    }
}
