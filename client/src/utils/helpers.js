export const unreadNotificationsFunc = (notifications) => {
    return notifications.filter((n) => n.isRead === false);
};

export const chatNotifCounter = (notif, user) => {
    let total = 0
    if (notif.length) {
        notif.forEach((e) => {
            if (notif.sender === user) {
                total++
            }
        })
    }
    if (total == 0) {
        total = ''
    }
    return total
}

export const otherUserFinder = (currentChat, loggedInUser) => {
    let result = ''
    let { userOne, userTwo } = currentChat
    if (userOne === loggedInUser) {
        result = userTwo
    } else {
        result = userOne
    }
    return result
}