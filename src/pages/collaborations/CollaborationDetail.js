import React from "react";
import withAuthorization from "components/hoc/withAuthorization";
import { subToCollaboration, joinCollaboration, subToProfile, leaveCollaboration, sendMessageToUser, subToMessages, startCollaboration } from "actions";
import { connect } from "react-redux";
import withRouter from "components/withRouter/withRouter";
import moment from "moment";
import ChatMessages from "components/collaboration/ChatMessages";
import { Timestamp } from "firebase/firestore";
import Timer from "components/collaboration/Timer";
import Spinner from "components/spinner/Spinner";
import { Badge } from "flowbite-react";
import RenderJoinedPeople from "components/collaboration/JoinedPeople";

class CollaborationDetail extends React.Component {

  state = {
    inputValue: '',
    reload: false
  }

  componentDidMount() {
    const { id } = this.props.router.params
    const { user } = this.props.auth


    joinCollaboration(id, user.uid)
    this.watchCollabChanges(id)
    this.watchMessagesChanges(id)
  }

  //watch collabortions

  watchCollabChanges = id => {
    this.unsubscribeFromCollaboration = this.props.subToCollaboration(id,
      ({ joinedPeople }) => {
        this.watchJoinedPeopleChanges(joinedPeople.map(jp => jp.id))
      }
    )
  }

  // watch joined people

  watchJoinedPeopleChanges = ids => {
    this.peopleWatchers = {}
    ids.forEach(id => {
      this.peopleWatchers[id] = this.props.subToProfile(id)
    });
  }

  //watch messages

  watchMessagesChanges = collabId => {
    this.unsubscribeFromMessages = this.props.subToMessages(collabId)
  }

  onKeyboardPress = e => {
    if (e.key === 'Enter') { this.onSendMessage(this.state.inputValue) }
  }

  onSendMessage = inputValue => {
    if (inputValue.trim() === '') { return }
    const timestamp = moment().valueOf().toString()
    const { user } = this.props.auth
    const { collaboration } = this.props


    const message = {
      user: {
        uid: user.uid,
        avatar: "",
        name: user.fullname
      },
      timestamp: parseInt(timestamp, 10),
      content: inputValue.trim()
    }

    this.props.sendMessageToUser({ message, collabId: collaboration.id, timestamp })
    //.then(_ => this.setState({inputValue: ''}))
  }

  onStartCollaboration = collaboration => {
    const { id, time } = collaboration
    const nowSeconds = Timestamp.now().seconds

    const expiresAt = new Timestamp(nowSeconds + time, 0)
    startCollaboration(id, expiresAt)
  }


  componentWillUnmount() {
    const { id } = this.props.router.params
    const { user } = this.props.auth

    this.unsubscribeFromCollaboration()
    this.unsubscribeFromMessages()

    Object.keys(this.peopleWatchers).forEach(uid => this.peopleWatchers[uid]())

    leaveCollaboration(id, user.uid)
  }

  getStartCollaborationStatus = collaboration => {
    if (Object.keys(collaboration).length === 0) { return 'loading' }

    if (!collaboration.expiresAt) { return 'notStarted' }
    if (Timestamp.now().seconds < collaboration.expiresAt.seconds) {
      return 'active'
    } else {
      return 'finished'
    }
  }

  reloadPage = () => {
    this.setState({ reload: true })
  }

  render() {
    const { collaboration, joinedPeople, messages } = this.props
    const { inputValue } = this.state
    const { user } = this.props.auth

    const status = this.getStartCollaborationStatus(collaboration)

    if (status === 'loading') { return <Spinner /> }

    return (
      <div className="grid grid-cols-3">
        <div className="border-y-2 border-l-2 p-4  flex flex-col gap-4">
          <h2 className="text-2xl font-semibold pt-5 ">Collaboration messages</h2>
          <div>
            <p>{collaboration.title}</p>
          </div>
          <div className="flex flex-col my-4 gap-4">
            <RenderJoinedPeople users={joinedPeople}/>
          </div>
          {'noStarted' === 'noStarted' &&
              <div>
                <button onClick={() => this.onStartCollaboration(collaboration)}
                        className=" mt-5 bg-blue-600 px-5 h-10 rounded-lg font-semibold tracking-wide text-sm text-white">
                        Start Collaboration
                </button>
              </div>
            }
        </div>
        <div className="col-span-2 border-2 overscroll-contain p-6">
        <div className="text-center">
            {status === 'active' &&
                <Timer
                  seconds={collaboration.expiresAt.seconds - Timestamp.now().seconds}
                  timeOutCallback={this.reloadPage} />
            }
            {status === 'finished' &&
              <div className="mb-10">
                <Badge color="failure" size="lg">
                  Collaboration has been finished
                </Badge>
              </div>
            }
          </div>
          <ChatMessages
            messages={messages}
            authUser={user}
          />
          <div className="flex justify-end mt-10 ">
            <input
              onChange={(e) => this.setState({ inputValue: e.target.value })}
              onKeyDown={this.onKeyboardPress}
              value={inputValue}
              placeholder="Your message...."
              className="border-2 rounded-l-lg w-full h-10 px-2"
              disabled={status === 'finished' || status === 'notStarted'}
            >
            </input>
            <button
              onClick={() => this.onSendMessage(inputValue)}
              disabled={status === 'finished' || status === 'notStarted'}
              className=" rounded-r-lg px-3 bg-blue-500 text-zinc-200">Send
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = () => ({
  subToCollaboration,
  subToProfile,
  subToMessages,
  sendMessageToUser
})

const mapStateToProps = state => {
  return {
    collaboration: state.collaboration.joined,
    joinedPeople: state.collaboration.joinedPeople,
    messages: state.collaboration.messages
  }
}
const Collaboration = withAuthorization(withRouter(CollaborationDetail))

export default connect(mapStateToProps, mapDispatchToProps())(Collaboration)