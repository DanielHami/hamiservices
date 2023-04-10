import React, { useEffect } from "react";
import withAuthorization from "components/hoc/withAuthorization";
import { subToCollaboration, joinCollaboration, subToProfile, leaveCollaboration } from "actions";
import { connect } from "react-redux";
import withRouter from "components/withRouter/withRouter";

function CollaborationDetail({ collaboration, joinedPeople, subToCollaboration, subToProfile, auth, router }) {
  const { id } = router.params;
  const { uid: userId } = auth.user;

  useEffect(() => {
    joinCollaboration(id, userId);
    const unsubscribeCollab = subToCollaboration(id, ({ joinedPeople }) => {
      const ids = joinedPeople.map((jp) => jp.id);
      ids.forEach((id) => {
        subToProfile(id);
      });
    });

    return () => {
      leaveCollaboration(id, userId);
      unsubscribeCollab();
    };
  }, [id, userId, subToCollaboration, subToProfile]);

  const renderJoinedPeople = (people) => {
    if (people.length === 0) {
      return null;
    }

    return people.map((person) => (
      <div key={person.uid}>
        <div>
          <p>Nicknam:{person.fullname}</p>
        </div>
        <div>
          <p>{person.state}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex">
      <div>
        <div>
          <p>Collaboration messages</p>
          <p>{collaboration.title}</p>
        </div>
        <div>{renderJoinedPeople(joinedPeople)}</div>
      </div>
      <div>
        <input placeholder="Your message...." className="border-2"></input>
        <button className="border-2 px-3">Send</button>
      </div>
    </div>
  );
}

const mapDispatchToProps = () => ({
  subToCollaboration,
  subToProfile,
});

const mapStateToProps = (state) => ({
  collaboration: state.collaboration.joined,
  joinedPeople: state.collaboration.joinedPeople,
});

const Collaboration = withAuthorization(withRouter(CollaborationDetail));

export default connect(mapStateToProps, mapDispatchToProps())(Collaboration);