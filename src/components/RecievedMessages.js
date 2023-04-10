import { connect } from "react-redux"
import { markMessageAsRead } from "actions"
import { useNavigate } from "react-router-dom"


const RecievedMessages = ({messages}) => {
    const navigate = useNavigate()

    const handleMessageAsRead = message => {
      markMessageAsRead(message)
    }

    const goToCollabortion = message => {
      markMessageAsRead(message)
      navigate(message.cta)
    }

      const filteredMessage = messages.filter(m => !m.isRead).map(message => (
        <div key={message.id} className="flex flex-col gap-2 border-b-2 pb-4">
          <div>
            <span>From: </span> {message.fromUser.name}
          </div>
          <div>
            <p>{message.text}</p>
          </div>
          <div className="flex gap-2">
          <div>
            <button onClick={() => goToCollabortion(message)} className="bg-amber-300 px-3 h-6">Join</button>
          </div>
          <div>
            <button onClick={() => handleMessageAsRead(message)} className="bg-cyan-500 px-3 h-6">Later</button>
          </div>
          </div>
        </div>
      )
      )
        if(filteredMessage.length === 0) {
          return <div>No messages</div>
        }
    return filteredMessage
}


const mapStateToProps = (state) => ({messages: state.auth.messages})

export default connect(mapStateToProps)(RecievedMessages)