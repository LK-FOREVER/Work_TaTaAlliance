export class Async {
    static waterfall(tasks: Action1<Action>[], callback?: Action) {
        if (tasks.length === 0) {
            if (callback) {
                callback();
            }
            return;
        }
        tasks.shift()(() => {
            Async.waterfall(tasks, callback);
        });
    }
}
