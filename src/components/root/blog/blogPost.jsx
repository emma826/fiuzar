import Image from "next/image";

export default function BlogPost({blogPost}) {
    return (
        <div>
            {blogPost.map((block) => {
                const mainClasses = "text-base font-medium leading-relaxed block"
                switch (block.type) {
                    case 'paragraph':
                        return <p key={block.id} className="mb-8 text-base font-medium leading-relaxed">{block.data.text}</p>;
                    case 'header':
                        const Tag = `h${block.data.level}`;
                        const classes = "mb-3 leading-relaxed"
                        if (block.data.level === 2) {
                            return <h2 key={block.id} className={`text-3xl font-semibold ${classes}`}>{block.data.text}</h2>;
                        } else if (block.data.level === 3) {
                            return <h3 key={block.id} className={`text-2xl font-medium ${classes}`}>{block.data.text}</h3>;
                        } else if (block.data.level === 4) {
                            return <h4 key={block.id} className={`text-xl font-normal ${classes}`}>{block.data.text}</h4>;
                        } else if (block.data.level === 5) {
                            return <h5 key={block.id} className={`text-lg font-light ${classes}`}>{block.data.text}</h5>;
                        } else if (block.data.level === 6) {
                            return <h6 key={block.id} className={`text-base font-thin ${classes}`}>{block.data.text}</h6>;
                        }
                        // return <Tag key={block.id}>{block.data.text}</Tag>;

                    case 'list':
                        if (block.data.style === 'unordered') {
                            return (
                                <ul key={block.id} className={`list-disc mb-8 ${mainClasses}`}>
                                    {block.data.items.map((item, index) => (
                                        <li className="mb-2" key={index}>{item.content}</li>
                                    ))}
                                </ul>
                            );
                        } else if (block.data.style === 'ordered') {
                            return (
                                <ol key={block.id} className={`list-decimal mb-8 ${mainClasses}`}>
                                    {block.data.items.map((item, index) => (
                                        <li className="mb-2" key={index}>{item.content}</li>
                                    ))}
                                </ol>
                            );
                        } else if (block.data.style === 'checklist') {
                            return (
                                <ul className="mb-8" key={block.id}>
                                    {block.data.items.map((item, index) => (
                                        <li className={`mb-2 ${mainClasses}`} key={index}>
                                            <input type="checkbox" checked={item.meta.checked} readOnly />
                                            {item.content}
                                        </li>
                                    ))}
                                </ul>
                            );
                        }
                        break;
                    case 'image':
                        return <Image width={400} height={400} className={`block w-full mb-8 ${mainClasses}`} key={block.id} src={block.data.file.url} alt={block.data.caption} />;
                    case 'quote':
                        return (
                            <blockquote key={block.id} style={{ textAlign: block.data.alignment }}>
                                <p>{block.data.text}</p>
                                <cite>{block.data.caption}</cite>
                            </blockquote>
                        );
                    case 'code':
                        return <pre key={block.id}><code>{block.data.code}</code></pre>;
                    case 'delimiter':
                        return <hr key={block.id} />;
                    case 'table':
                        return (
                            <table key={block.id}>
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
                            <div key={block.id} style={{ border: '1px solid red', padding: '10px' }}>
                                <strong>{block.data.title}</strong>
                                <p>{block.data.message}</p>
                            </div>
                        );
                    case 'raw':
                        return <div key={block.id}> {block.data.html} </div>;
                    default:
                        return null;
                }
            })}
        </div>
    );
}