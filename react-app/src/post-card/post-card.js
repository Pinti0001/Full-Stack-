export default function PostCard({data}) {

    const {
        title = '',
        content = '',
        author = '',
        postImageLink = ''
    } = data || {}


    return (
        <div className="w-80 border border-gray-200 rounded-lg overflow-hidden text-sm">
            <img src={postImageLink} alt="Post" className="w-full h-40" />
            <div className="p-3">
                <h4 className="font-semibold text-sm mb-1">{title}</h4>
                <p className="font-semibold mb-1">{author}</p>
                <p className="text-sm leading-relaxed">
                    {content}
                </p>
               <div className="flex gap-4 mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">Share</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">Know More</button>
                </div>

            </div>
            
        </div>
    );
}
