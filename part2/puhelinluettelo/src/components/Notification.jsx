const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    const notificationType = type === "success" || type === "failure" ? type : "default"
    if (type === "default") {
        console.log(`Notification type not provided, using '${notificationType}' notification.`)
    }

    return (
        <div className={notificationType}>
            {message}
        </div>
    )
}

export default Notification
