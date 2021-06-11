import { signIn, signOut, useSession } from 'next-auth/client'

const Header = () => {
    const [session, loading] = useSession()

    return (
        <div className="flex px-4 mt-2 justify-between items-center">
            <div>
                Signed in as <code>{session?.user?.name || 'None'}</code>
            </div>
            {!session?.user && (
                <button
                    className="bg-black opacity-80 text-white text-sm p-2 rounded"
                    onClick={() => signIn('github')}
                >
                    Sign In
                </button>
            )}
            {session?.user && (
                <button
                    className="bg-black opacity-80 text-white dark:bg-white dark:text-black text-sm p-2 rounded"
                    onClick={() => signOut()}
                >
                    Sign Out
                </button>
            )}
        </div>
    )
}

export default Header
