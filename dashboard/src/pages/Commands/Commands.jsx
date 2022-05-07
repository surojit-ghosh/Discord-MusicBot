import React, { useEffect, useState } from 'react';

import './Commands.scss';

const Commands = () => {
    const [commands, setCommands] = useState({});
    const [isFetching, setIsFetching] = useState(true);
    const [isError, setIsError] = useState(false);
    const [active, setActive] = useState('');
    const [prefix, setPrefix] = useState('');

    useEffect(() => {
        fetch('/api/commands')
            .then((res) => res.json())
            .then((data) => {
                setCommands(data);
                setIsFetching(false);
                setActive(Object.keys(data)[0])
            })
            .catch((error) => {
                setIsFetching(false);
                setIsError(true);
            });

        fetch('api/prefix')
            .then((res) => res.json())
            .then((data) => {
                setPrefix(data.prefix);
            })
            .catch((error) => { });
    }, []);

    const handleClick = (category) => {
        if (active !== category) setActive(category);
    };

    return (
        <>
            <h1 className='commands__header'>Commands</h1>
            <div className='commands'>
                {isFetching && <p>Fetching commands from bot...</p>}
                {isError && <p>Unable to fetch data from the bot...</p>}

                <div className="commands-category">
                    {((!isFetching && !isError) && Object.keys(commands).length > 0) && (
                        Object.keys(commands).map((category, index) => (
                            <button key={index} className={active === category ? 'active' : null} onClick={() => handleClick(category)}>{category}</button>
                        ))
                    )}
                </div>

                <div className="commands-list">
                    {(!isFetching && !isError && commands[active]?.length) && (
                        commands[active].map((cmd, index) => (
                            <div key={index} className="cmd">
                                <div>
                                    <p className='command__name'>{prefix + cmd.name + ' -'} <span className='command__description'>{cmd.description}</span></p>
                                </div>
                                <p className='command__usage'>Usage - <span>{prefix + cmd.usage}</span></p>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </>
    );
};

export default Commands;

