import Navbar from "components/header/Navbar";
import Home from "pages/Home";
import CustomFooter from "components/footer/Footer";
import { Route, Routes } from 'react-router-dom'
import Profile from "pages/Profile";
import Services from "pages/Services";
import ServiceDetail from "pages/ServiceDetail";
import Faq from "pages/Faq";
import Login from "pages/Login";
import Register from "pages/Register";
import NotFound from "pages/NotFound";
import SecretPage from "pages/Hide";
import React from "react";
import CreateServices from "pages/services/createServices";
import UserServices from "pages/services/UserServices";
import { connect } from "react-redux"
import { logout } from "actions"
import Spinner from "components/spinner/Spinner";
import SentOffers from "pages/offers/SentOffers";
import RecievedOffers from "pages/offers/RecievedOffers";
import RecievedCollaboration from "pages/collaborations/RecievedCollaboration";
import CollaborationDetail from "pages/collaborations/CollaborationDetail";
import CollaborationFunc from "pages/collaborations/CollaborationFunc";
import Navi from "components/header/Nav";


class ServiceApp extends React.Component {

    handleLogout = uid => this.props.dispatch(logout(uid))

    renderApplication = auth =>
        <React.Fragment>
            <div className="min-h-screen flex flex-col gap-32">
                    <Navi id="navbar-main" auth={this.props.auth} logout={() => this.handleLogout(auth.user.uid)} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />}></Route>
                        <Route path="/collaborations/me" element={<RecievedCollaboration />} />
                        <Route path="/collaborations/:id" element={<CollaborationDetail />} />
                        <Route path="/services/sent" element={<SentOffers />} />
                        <Route path="/services/recieved" element={<RecievedOffers />} />
                        <Route path="/services/my" element={<UserServices />} />
                        <Route path="/services/new" element={<CreateServices />} />
                        <Route path="/services/:serviceId" element={<ServiceDetail />}></Route>
                        <Route path="/services" element={<Services />}></Route>
                        <Route path="/faq" element={<Faq />}></Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<NotFound />}></Route>
                    </Routes>
                    <CustomFooter />
                    </div>
                    </React.Fragment>

                    render() {
        const {auth} = this.props
                    return auth.isAuthResolved ? this.renderApplication(auth) : <Spinner />
    }
}

const mapState = state => ({auth: state.auth})
                    export default connect(mapState)(ServiceApp)