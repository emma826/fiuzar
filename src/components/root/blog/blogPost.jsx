import Image from "next/image";

export default function BlogPost({ blogPost }) {
    return (
        <>
            {blogPost.map((block) => {

                switch(block.type){

                    case 'paragraph':
                        return <p key={block.id} className="mb-4">{block.data.text}</p>;
                    
                    case "header":
                        const tag = `h${block.data.level}`
                        
                        if(tag == "h2") {
                            return <h2 key={block.id} className={`text-2xl font-semibold mb-4 mt-4`}>{block.data.text}</h2>;
                        }
                        if(tag == "h3") {
                            return <h3 key={block.id} className={`text-xl font-semibold mb-3`}>{block.data.text}</h3>;
                        }
                        else {
                            return React.createElement(
                                tag,
                                { key: block.id, className: "text-xl font-semibold mb-3" },
                                block.data.text
                            );
                        }

                    case "list":
                        if (block.data.style === 'unordered') {
                            return (
                                <ul key={block.id} className={`list-disc mb-4 ml-6`}>
                                    {block.data.items.map((item, index) => (
                                        <li className="mb-2" key={index}>{item.content}</li>
                                    ))}
                                </ul>
                            );
                        } else if (block.data.style === 'ordered') {
                            return (
                                <ol key={block.id} className={`list-decimal mb-4 ml-6`}>
                                    {block.data.items.map((item, index) => (
                                        <li className="mb-2" key={index}>{item.content}</li>
                                    ))}
                                </ol>
                            );
                        } else if (block.data.style === 'checklist') {
                            return (
                                <ul className="mb-3" key={block.id}>
                                    {block.data.items.map((item, index) => (
                                        <li className={`mb-2`} key={index}>
                                            <input type="checkbox" checked={item.meta.checked} readOnly />
                                            {item.content}
                                        </li>
                                    ))}
                                </ul>
                            );
                        }

                    case 'image':
                        return <img className={`block w-full mb-4`} key={block.id} src={`${process.env.NEXT_PUBLIC_STORAGE_SERVER}`} alt={block.data.caption} />;
                    
                    case 'quote':
                        return (
                            <blockquote className="mb-4" key={block.id} style={{ textAlign: block.data.alignment }}>
                                <p>{block.data.text}</p>
                                <cite>{block.data.caption}</cite>
                            </blockquote>
                        );

                    case 'code':
                        return <pre key={block.id} className="mb-4"><code>{block.data.code}</code></pre>;

                    case 'delimiter':
                        return <hr key={block.id} className="mb-4" />;

                    case 'table':
                        return (
                            <table key={block.id} className="mb-4">
                                <tbody>
                                    {block.data.content.map((row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {row.map((cell, cellIndex) => (
                                                <td key={cellIndex}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        );

                    case 'warning':
                        return (
                            <div key={block.id} className="mb-4" style={{ border: '1px solid red', padding: '10px' }}>
                                <strong>{block.data.title}</strong>
                                <p>{block.data.message}</p>
                            </div>
                        );
                        
                    case 'raw':
                        return <div key={block.id} className="mb-4"> {block.data.html} </div>;

                    default:
                        return null;
                }

            })}
        </>
    );
}