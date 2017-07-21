export let Notifications = [];
let setState = null;

export function Notify(title, message) {
    Notifications.push({
        title,
        message,
        remove: () => {
            setTimeout(() => {
                if (setState) {
                    setState(null)
                    setState(Notifications[0])
                }
            }, 500);

            Notifications.shift()
        }
    });

    if (Notifications.length === 1 && setState) {
        setState(Notifications[0])
    }
}

export function Register(SetState) {
    setState = SetState;
}