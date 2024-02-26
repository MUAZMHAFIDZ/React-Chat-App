import { create } from 'zustand'

const useConvertion = create((set) => ({
    selectedConvertion: null,
    setSelectedConvertion: (selectedConvertion) => set({selectedConvertion}),
    messages: [],
    setMessages: (messages) => set({messages}) 
}))

export default useConvertion