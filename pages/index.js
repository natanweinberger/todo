import List from '../components/List'
import Modal from '../components/Modal'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json())

const useLists = () => {
    const { data, error } = useSWR('/api/lists', fetcher)

    return {
        lists: data,
        isLoading: !error && !data,
        isError: error,
    }
}

export default function Home() {
    const [isModalShowing, setIsModalShowing] = useState(false)

    const { lists } = useLists()

    const updateList = async (list_id, list, send = true) => {
        mutate('/api/lists', { ...lists, [list_id]: list }, false)
        if (send == true) {
            await fetch('/api/lists', {
                method: 'POST',
                body: JSON.stringify({ ...lists, [list_id]: list }),
            })
            mutate('/api/lists')
        }
    }

    const showLists = (lists) =>
        Object.keys(lists).map((key) => {
            return (
                <List
                    key
                    list_id={key}
                    list={lists[key]}
                    setIsModalShowing
                    updateList={updatedList => updateList(key, updatedList)}
                />
            )
        })

    return (
        <div className="flex h-screen w-max min-w-full p-2 bg-blue-400">
            {(lists && showLists(lists)) ||
                showLists({ list_4: { title: 'waiting', cards: [] } })}
            {isModalShowing && <Modal setIsModalShowing={setIsModalShowing} />}
        </div>
    )
}
