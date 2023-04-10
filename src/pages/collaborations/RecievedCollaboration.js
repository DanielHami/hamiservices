import withAuthorization from "components/hoc/withAuthorization";
import React from "react";
import { fetchCollaborations } from "actions";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { Badge } from "flowbite-react";
import { Table } from "flowbite-react";
import {AiFillClockCircle} from "react-icons/ai"
import { connect } from "react-redux";
import { Timestamp } from "firebase/firestore";

class RecievedCollaboration extends React.Component {

  state = { collaborations: [] }

    getStartCollaborationStatus  = expiresAt => {
      if (!expiresAt) { return {className: 'failure', status: 'Not Started'}}
      if (Timestamp.now().seconds < expiresAt.seconds) {
       return {className: 'warning', status: 'In Progress'} 
      } else {
        return {className: 'success', status: 'Finished'}
      }
    }

  componentDidMount() {
    const { auth: { user } } = this.props
    fetchCollaborations(user.uid)
      .then(collaborations =>
        this.setState({ collaborations }))
  }

  renderCollaborations = (collaborations) => {
    return collaborations.map(collaboration => {
      const {className, status} = this.getStartCollaborationStatus(collaboration.expiresAt)
      return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={collaboration.id}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {collaboration.title}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      color="gray"
                      icon={AiFillClockCircle}
                      className="w-fit"
                    >
                      replied {moment(collaboration.createdAt.toDate()).fromNow()} &nbsp;
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={`${className}`} className="w-fit">
                      {status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/collaborations/${collaboration.id}`}>
                      <button className="bg-blue-600 text-white px-3 h-7 rounded-lg">Enter</button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
      )
    })
  }
  render() {
    const { collaborations } = this.state
    const { offers } = this.props.auth
    return (
      <div>
        <div className="mb-6" >
          <h1 className="text-2xl font-semibold">Collaborations</h1>
        </div>
        <Table>
          <Table.Head>
            <Table.HeadCell>
              Service title
            </Table.HeadCell>
            <Table.HeadCell>
              Cretaed
            </Table.HeadCell>
            <Table.HeadCell>
              Status
            </Table.HeadCell>
            <Table.HeadCell>
              Price
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">
                Edit
              </span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
          { this.renderCollaborations(collaborations) }       
          </Table.Body>
        </Table>
      </div>
    )
  }
}

/*const mapStateToProps = (state) => {
  return {
    offers: state.offers.received
  }
}*/
export default withAuthorization(RecievedCollaboration)


