import List from '@/components/list/list'
import Modal from '@/components/Modal'
import Header from '@/components/header'
import { useState, useEffect } from 'react'
import useSWR, { mutate } from 'swr'
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
        const { data, error } = useSWR('/api/lists', fetcher)
        return {
            lists: data,
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
        mutate(
            '/api/lists',
            (lists) => {
                return [...lists, { title: 'New list', cards: [] }]
            },
            false
        )
        await fetch('/api/lists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'New list',
            }),
        })
        mutate('/api/lists')
    }

    const showLists = (lists) =>
        lists.map((list) => {
            return (
                <List
                    key={list.id}
                    list_id={list.id}
                    list={list}
                    setIsModalShowing={setIsModalShowing}
                    updateList={(updatedList) => updateList(list, updatedList)}
                />
            )
        })

    return (
        <div className="absolute inset-0">
            {/* Fix viewport height on mobile: https://stackoverflow.com/a/66501522/804237 */}
            <div className="flex flex-col h-full bg-yellow-50 bg-opacity-100 dark:bg-black">
                <Header />
                <div className="flex flex-grow overflow-x-auto p-2">
                    {(lists && showLists(lists)) || 'Waiting'}
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
