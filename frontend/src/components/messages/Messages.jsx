import { useEffect, useRef } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useGetMessage from '../../hooks/useGetMessage'
import useConversation from '../../store/useConversation'
const Messages = () => {
    const {messages, loading} = useGetMessage()
    const lastMessage = useRef()

    useEffect(() => {
        lastMessage.current?.scrollIntoView({ behaviour: "smooth" })
    }, [messages])

    return (
        <div className='row-span-7 my-1 pb-1 bg-slate-400 bg-opacity-55 rounded-md h-[65vh] w-full overflow-x-hidden overflow-y-auto px-2'>
            {!loading && messages.length > 0 && messages.map((message) => (
                <Message ref={lastMessage} message={message} />
            ))}

            {loading && [...Array(3)].map((_) => <MessageLoading />)}

            {!loading && messages.length === 0 && (
                <p className='text-center'>No Interact. Please Send your first Message!</p>
            )}
        </div>
    )
}
export default Messages

const Message = ({message}) => {
    const {authUser} = useAuthContext()
    const {selectedConversation} = useConversation()

    const FromMe = message.senderId === authUser._id

    return (
        <>
        {
            FromMe ? (
            <div className='flex justify-end'>
                <p className='break-words whitespace-normal text-sm mt-2 max-w-[75%] bg-blue-500 relative px-4 rounded-md'>
                {message.message}
                </p>
            </div>
            ) : (
            <div className='flex justify-start'>
                <p className="break-words whitespace-normal text-sm mt-2 max-w-[75%] bg-green-500 relative px-4 rounded-md">
                {message.message}
                </p>
            </div>
            )
        }
        </>
    )
}

const MessageLoading = () => {
    return (
        <div>
            <div className='flex justify-start'>
                <p className="break-words whitespace-normal text-sm mt-2 max-w-[75%] bg-slate-500 relative px-4 rounded-md">
                ...................................
                </p>
            </div>
            <div className='flex justify-end'>
                <p className='break-words whitespace-normal text-sm mt-2 max-w-[75%] bg-slate-500 relative px-4 rounded-md'>
                ...................................
                </p>
            </div>
            <div className='flex justify-start'>
                <p className="break-words whitespace-normal text-sm mt-2 max-w-[75%] bg-slate-500 relative px-4 rounded-md">
                ...................................
                </p>
            </div>
            <div className='flex justify-end'>
                <p className='break-words whitespace-normal text-sm mt-2 max-w-[75%] bg-slate-500 relative px-4 rounded-md'>
                ...................................
                </p>
            </div>
        </div>
    )
}

// return (
//     <>
//         <p className="from-them">It was loud. We just laid there and said &ldquo;is this an earthquake? I think this is an earthquake.&rdquo;</p>
//         <p className="">Like is this an earthquake just go back to sleep</p>
//         <p className="from-them margin-b_one">It&rsquo;s more like &ldquo;this is an earthquake. Check the Internet. Yup. Earthquake. This is the size. This is the epicenter. Check social media. Make sure the East Coast knows I&rsquo;m alive. Okay, try and go back to sleep.&rdquo;</p>
//         <p className="from-me no-tail emoji">👍🏻</p>
//         <p className="from-me">Glad you&rsquo;re safe</p>
//         <p className="from-them">It was loud. We just laid there and said &ldquo;is this an earthquake? I think this is an earthquake.&rdquo;</p>
//         <p className="from-me">Like is this an earthquake just go back to sleep</p>
//         <p className="from-them margin-b_one">It&rsquo;s more like &ldquo;this is an earthquake. Check the Internet. Yup. Earthquake. This is the size. This is the epicenter. Check social media. Make sure the East Coast knows I&rsquo;m alive. Okay, try and go back to sleep.&rdquo;</p>
//         <p className="from-me no-tail emoji">👍🏻</p>
//         <p className="from-me">Glad you&rsquo;re safe</p>
//         <p className="from-them">It was loud. We just laid there and said &ldquo;is this an earthquake? I think this is an earthquake.&rdquo;</p>
//         <p className="from-me">Like is this an earthquake just go back to sleep</p>
//         <p className="from-them margin-b_one">It&rsquo;s more like &ldquo;this is an earthquake. Check the Internet. Yup. Earthquake. This is the size. This is the epicenter. Check social media. Make sure the East Coast knows I&rsquo;m alive. Okay, try and go back to sleep.&rdquo;</p>
//         <p className="from-me no-tail emoji">👍🏻</p>
//         <p className="from-me">Glad you&rsquo;re safe</p>
//     </>