import connectDB from "@/db/ConnectDB";
import Tracker from "@/models/trackerModel";
import PublicTrackerNotes from "./PublicTrackerNote"; // client component for notes

export const dynamic = "force-dynamic";

export default async function PublicTrackerPage({ params }) {
  const { id } = await params;
  await connectDB();
  const doc = await Tracker.findById(id).lean();
  if (!doc)
    return (
      <div className="text-[#7d8590] text-center py-20">Tracker not found</div>
    );

  return (
    <div className="bg-[#0d1117] text-[#f0f6fc] min-h-screen px-4 py-8 space-y-8">
      <div className="max-w-4xl mx-auto space-y-4 pb-4">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-[#f0f6fc] border-b border-[#30363d] pb-2">
          {doc.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap gap-3 text-sm text-[#7d8590]">
          <span>
            Created by:{" "}
            <span className="text-[#f0f6fc] font-medium">Utsab Adhikari</span>
          </span>
          <span>
            Date:{" "}
            <span className="text-[#f0f6fc] font-medium">
              {new Date(doc.date).toDateString()}
            </span>
          </span>
          <span>
            Status: <span className="text-[#f0f6fc] font-medium">{doc.status}</span>
          </span>
        </div>

        {doc.description && (
          <p className="text-[#7d8590] text-sm leading-relaxed mt-2">
            {doc.description}
          </p>
        )}
      </div>

      <PublicTrackerNotes editorContent={doc.editorContent} />

      {/* Tasks Section */}
      <div className="max-w-4xl mx-auto space-y-3">
        <h2 className="text-lg font-semibold text-[#f0f6fc] border-b border-[#30363d] pb-2">
          Tasks
        </h2>
        <ul className="space-y-2">
          {doc.tasks?.map((t, i) => (
            <li
              key={i}
              className="flex flex-col md:flex-row md:items-center gap-2 p-3 bg-[#161b22] rounded-md border border-[#30363d]"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex h-2 w-2 rounded-full ${
                    t.completed ? "bg-[#3fb950]" : "bg-[#7d8590]"
                  }`}
                />
                <span
                  className={`text-sm ${
                    t.completed ? "line-through text-[#7d8590]" : "text-[#f0f6fc]"
                  }`}
                >
                  {t.name}
                </span>
              </div>
              {t.notes && (
                <p className="text-[#7d8590] text-sm md:ml-auto">
                  {t.notes}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <footer className="text-center text-[#7d8590] text-sm mt-8">
        <p>© {new Date().getFullYear()} Utsab Adhikari</p>
        <p>Built with Next.js & Tailwind CSS</p>
      </footer>
    </div>
  );
}