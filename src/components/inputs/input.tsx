interface Props {
    placeholder?: string;
    type?: string;
    name?: string;
}

export default function Input(props: Props) {
    return (
        <div>
            <p>{props.name}</p>
            <input
                type={props.type || "text"} 
                placeholder={props.placeholder}
                className="p-2 rounded-md border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}
