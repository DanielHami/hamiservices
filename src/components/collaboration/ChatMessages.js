import moment from "moment"

const ChatMessages = ({messages, authUser}) => {

   const renderMessages = (messages, authUser) => {
      
        if(messages.length > 0){
            return messages.map(message => {
                if(message.user.uid === authUser.uid){
                    return (
                        <div className=" my-6" key={message.id}>
                          <div className="flex justify-start">
                            <div className="px-3 bg-zinc-200 border-2 rounded-lg">
                              <span>{message.content}</span>
                            </div>
                          </div>
                          <span className="text-xs">{moment(message.timestamp).fromNow()}</span>
                        </div>
                    )
                }
            return (
                <div className="text-right" key={message.id}>
                  <div className="flex justify-end">
                    <div className="bg-zinc-100 border-2 rounded-lg px-3">
                    <span>{message.content}</span>
                    </div>
                  </div>
                    <span className="text-xs">{moment(message.timestamp).fromNow()}</span>
                </div>
            )
            })
        }
        return null
    }
    return renderMessages(messages, authUser)
}

export default ChatMessages