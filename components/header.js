import { useAuth } from '../lib/auth'

const Header = () => {
    const auth = useAuth()
    return (
        <div className="flex px-4 mt-2 justify-between items-center">
            <div>
                Current user: <code>{auth?.user?.email || 'None'}</code>
            </div>
            {!auth.user && (
                <button
                    className="bg-umber opacity-80 text-white text-sm p-2 rounded"
                    onClick={(e) =>
                        auth.signin('naweinberger@gmail.com', 'password')
                    }
                >
                    Sign In
                </button>
            )}
            {auth.user && (
                <button
                    className="bg-umber opacity-80 text-white text-sm p-2 rounded"
                    onClick={(e) => auth.signout()}
                >
                    Sign Out
                </button>
            )}
        </div>
    )
}

export default Header
