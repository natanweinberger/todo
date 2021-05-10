import Head from 'next/head';
import List from '../components/List';
import Modal from '../components/Modal';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';

const fetcher = (url) => fetch(url).then((r) => r.json());
const compare = (a, b) => JSON.stringify(a) == JSON.stringify(b);

const useLists = () => {
    const { data, error } = useSWR(`/api/list`, fetcher);

    return {
        lists: data,
        isLoading: !error && !data,
        isError: error,
    };
};

export default function Home() {
    const [isModalShowing, setIsModalShowing] = useState(false);

    const { lists, isLoading, isError } = useLists();

    if (isLoading) {
        return 'Waiting';
    } else if (isError) {
        return 'Error';
    }

    const postList = (lists) => {
        fetch('/api/list', {
            method: 'POST',
            body: lists
        })

    }

    const updateList =  async (list_id, list, send = true) => {
        mutate('/api/list', { ...lists, [list_id]: list }, false)
        if (send == true) {
        await fetch('/api/list', {
                method: 'POST',
                body: JSON.stringify({ ...lists, [list_id]: list })
              })
        mutate('/api/list')
    }
    }

    return (
        <div className="flex h-screen w-max min-w-full p-2 bg-blue-400">
            {Object.keys(lists).map((key) => {
                return (
                    <List
                        key={key}
                        list_id={key}
                        list={lists[key]}
                        setIsModalShowing={setIsModalShowing}
                        updateList={(...args) => updateList(key, ...args)}
                    />
                );
            })}
            {isModalShowing && <Modal setIsModalShowing={setIsModalShowing} />}
        </div>
    );
}
