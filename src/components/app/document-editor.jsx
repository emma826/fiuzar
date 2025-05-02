export default function DocumentEditor({ h1, setH1, article, setArticle }) {
    return (
        <div className="max-w-[800px] w-full mx-auto pt-4">
            <div className="rounded-xl min-h-96 border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                {/* Editable H1 in HTML format */}
                <div contentEditable className="text-3xl font-bold mb-3 p-3 rounded-lg">{h1}</div>

                {/* Editable Article in HTML format */}
                <div
                    contentEditable
                    dangerouslySetInnerHTML={{ __html: article }}
                    onInput={(e) => setArticle(e.currentTarget.innerHTML)}
                    className="w-full p-2 borde overflow-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter article content here..."
                />
            </div>
        </div>
    );
}