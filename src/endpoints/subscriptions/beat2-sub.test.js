import {check, sleep} from "k6";
import ws from 'k6/ws';
import {config} from "../../config";

export default function () {
    const url = `${config.nodeUrl}/subscriptions/beat2`;

    const res = ws.connect(url, function (socket) {});

    check(res, { 'status is 101': (r) => r && r.status === 101 });
    
    sleep(40)
}
