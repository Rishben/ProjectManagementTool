import React, { useContext } from 'react'
import MemberLogin from "../components/MemberLogin"
import MemberRegister from "../components/MemberRegister"
import TeamLeadLogin from "../components/TeamLeadLogin"
import TeamLeadRegister from "../components/TeamLeadRegister"
import ViewContext from '../context/ViewContext'

const LoginRegistram = () => {
    const { view } = useContext(ViewContext)

    const renderComponent = () => {
        switch(view) {
            case 'teamLeadLogin':
                return <TeamLeadLogin />;
            case 'memberLogin':
                return <MemberLogin />;
            case 'teamLeadRegister':
                return <TeamLeadRegister />;
            case 'memberRegister':
                return <MemberRegister />;
            default:
                return null;
        }
    }

    return (
        <div className='w-full min-h-screen bg-gray-100 flex items-center justify-center'>
            {renderComponent()}
        </div>
    )
}

export default LoginRegistram
