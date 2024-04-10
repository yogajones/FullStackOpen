import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
    return notification ? (
        <span style={{
            border: '3px #add8e6',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '5px',
            backgroundColor: 'lightblue'
        }}>
            <strong>{notification}</strong>
        </span>
    ) : null
}

Notification.propTypes = {
    notification: PropTypes.string.isRequired
}


export default Notification