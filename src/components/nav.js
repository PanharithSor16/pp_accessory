import calcualtor from "../assets/calculator.png"
import group from "../assets/group.png"
import list from "../assets/list.png"
import transfer from "../assets/Transfer.png"
import allTransfer from "../assets/Transition2.png"
import next from "../assets/next.png"
import summary from "../assets/summary.jpg"

export const navbar_data = [
    {
        to: '/',
        image:allTransfer,
        title: "All Transfer"
    },
    {
        to: '/transfer',
        image: transfer,
        title: "Transfer"
    },
    {
        to: '/next',
        image: next,
        title: "NextPlan"
    },
    {
        to: '/balance',
        image: calcualtor,
        title: "Balance"
    },
    {
        to: '/summary',
        image: summary,
        title: "Summary"
    },
    {
        to: '/master',
        image: list,
        title: "Master"
    },
    {
        to: '/user',
        image: group, 
        title: "User"
    },
]

export const receive_time = (date) => {
    // Extract the time part
    let timePart = date.split("T")[1];
    let datePart = date.split("T")[0];
    // Split the time part by ":"
    let timeElements = timePart.split(":");

    let hours = timeElements[0];
    let minutes = timeElements[1];
    let time = `${datePart} ${hours}:${minutes}`;
    return time;
}
