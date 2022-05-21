import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const General = ({ id }) => {
    const [prefix, setPrefix] = useState('');
    const [inputPrefix, setInputPrefix] = useState('');

    useEffect(() => {
        fetch('/api/dashboard/prefix?guildId=' + id)
            .then((res) => res.json())
            .then((data) => {
                setPrefix(data.prefix);
                setInputPrefix(data.prefix);
            })
            .catch(() => { });
    }, [id]);

    const handlePrefixChange = (e) => {
        const value = e.target.value;
        setInputPrefix(value);
    };

    const handlePrefixSubmit = async () => {
        if (inputPrefix.length > 5) {
            toast.error(`Prefix can't be more than 5 characters`);
            setInputPrefix(prefix);
        };
        if (inputPrefix !== prefix) {
            await toast.promise(
                fetch('/api/dashboard/prefix', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ guildId: id, prefix: inputPrefix })

                }), {
                pending: 'Updating Prefix',
                success: 'Successfully updated prefix',
                error: 'Unable to updated prefix'
            });
            setPrefix(inputPrefix);
        };
    };

    return (
        <>
            <div className='container'>
                <div className="prefix">
                    <p className='feature_head'>Prefix</p>
                    <p className='feature_desc'>Set the prefix for commands</p>
                    <div className="from">
                        <input onChange={handlePrefixChange} className='input' type="text" value={inputPrefix} />
                        <button onClick={handlePrefixSubmit} className='submit'>Update</button>
                    </div>
                </div>
            </div>
            <ToastContainer
                theme='dark'
            />
        </>
    );
};

export default General;