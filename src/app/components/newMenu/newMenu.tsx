import React, { useEffect, useState } from 'react';
import Notif from '../notification/notification';  

const orderDone: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5030/events');

        eventSource.onmessage = (event) => {
            setShowModal(true);
        };

        eventSource.onerror = (error) => {
            console.error('Erreur :', error);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const closeModal = () => setShowModal(false);

    return (
        <div>
                <Notif
                    title="Nouveau Menu disponible !"
                    description={`Venez vite découvrir le nouveau Menu !`}
                    isOpen={showModal}
                    closeModal={closeModal}
                />
        </div>
    );
}

export default orderDone;

