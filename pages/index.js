import List from '@/components/list/list'
import Modal from '@/components/Modal'
import Header from '@/components/header'
import { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
import { getData } from '@/lib/db'
import { signIn, signOut, useSession } from 'next-auth/client'

const fetcher = async (url, token) => {
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json', token }),
    })

    return res.json()
}

const onEscapeEffect = (event, callback) => {
    if (event.key == 'Escape') {
        callback()
    }
}

export default function Home() {
    const [session, loading] = useSession()

    const useLists = () => {
        const { data, error } = useSWR(['/api/lists', 'natan'], fetcher)
        return {
            lists: data?.lists,
            order: data?.order,
            isLoading: !error && !data,
            isError: error,
        }
    }
    const [isModalShowing, setIsModalShowing] = useState(false)

    const { lists } = useLists()

    const updateList = async (list_id, list, send = true) => {
        mutate('/api/lists', { ...lists, [list_id]: list }, false)
        if (send == true) {
            await fetch('/api/lists', {
                method: 'PATCH',
                body: JSON.stringify({ ...lists, [list_id]: list }),
            })
            mutate('/api/lists')
        }
    }

    const addList = async () => {
        const tempId = 'temp'
        mutate(
            '/api/lists',
            { ...lists, [tempId]: { title: 'New list', cards: [] } },
            false
        )
        await fetch('/api/lists', {
            method: 'POST',
        })
        mutate('/api/lists')
    }

    const showLists = (lists) =>
        Object.keys(lists).map((key) => {
            return (
                <List
                    key={key}
                    list_id={key}
                    list={lists[key]}
                    setIsModalShowing={setIsModalShowing}
                    updateList={(updatedList) =>
                        updateList(lists[key], updatedList)
                    }
                />
            )
        })

    return (
        <div className="absolute inset-0">
            {/* Fix viewport height on mobile: https://stackoverflow.com/a/66501522/804237 */}
            <div className="flex flex-col h-full bg-yellow-50 bg-opacity-100 dark:bg-black">
                <Header />
                <div className="flex flex-grow overflow-x-auto p-2">
                    {(lists && showLists(lists)) ||
                        showLists({ temp: { title: 'waiting', cards: [] } })}
                    <div
                        className="flex rounded-full h-12 w-12 mx-2 items-center justify-center self-center text-white bg-black opacity-70 hover:opacity-90 active:opacity-100"
                        onClick={addList}
                    >
                        <div>+</div>
                    </div>
                    <div className="w-2 flex-none"> </div>
                    {isModalShowing && (
                        <Modal setIsModalShowing={setIsModalShowing} />
                    )}
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const data = await getData()
    return {
        props: { data },
    }
}
