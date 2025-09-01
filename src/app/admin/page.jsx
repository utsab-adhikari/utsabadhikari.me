"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {
  PlusIcon,
  ChartBarIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  MagnifyingGlassIcon,
  BoltIcon,
  UserCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowUpTrayIcon,
  DocumentDuplicateIcon
} from "@heroicons/react/24/outline";
import { ArrowLeft, MoreVertical, Calendar, Eye, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [dashboardData, setDashboardData] = useState(null);
  const [activeTab, setActiveTab] = useState("articles");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null);
  const [notification, setNotification] = useState({ type: "", message: "" });

  const fetchDashboard = async () => {
    try {
      const res = await axios.get("/api/admin");
      if (res.data.success) {
        setDashboardData(res.data);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      setNotification({ type: "error", message: "Failed to load admin data" });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchDashboard();
    }
  }, [status]);

  const handleArticleAction = async (articleId, action) => {
    setLoading(true);
    setMenuOpen(null);

    try {
      let res;
      switch (action) {
        case "delete":
          res = await axios.put("/api/v1/actions/trash", { articleId });
          break;
        case "publish":
          res = await axios.put("/api/v1/actions/publish", { articleId });
          break;
        case "restore":
          res = await axios.put("/api/v1/actions/restore", { articleId });
          break;
        case "unpublish":
          res = await axios.put("/api/v1/actions/unpublish", { articleId });
          break;
        case "delete-permanent":
          res = await axios.delete(`/api/v1/articles/${articleId}`);
          break;
        default:
          throw new Error(`Unknown action: ${action}`);
      }

      if (res.data.success) {
        setNotification({ type: "success", message: `Action: ${action}` });
        fetchDashboard();
      } else {
        throw new Error(res.data.message || "Action failed");
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: error.response?.data?.message || "Action failed",
      });
    } finally {
      setTimeout(() => setNotification({ type: "", message: "" }), 3000);
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d1117] text-[#f0f6fc]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1f6feb]"></div>
        <p className="ml-3 text-[#7d8590] text-sm">Loading admin panel...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d1117] text-[#f0f6fc] p-6 text-center">
        Please log in to access the admin panel.
      </div>
    );
  }

  const { articles, totals, users, messages, views } = dashboardData || {};

  const navItems = [
    { label: "Create Article", href: "/v1/articles/create", icon: PlusIcon },
    { label: "Analytics", href: "/admin/analytics", icon: ChartBarIcon },
    { label: "Users", href: "/admin/users", icon: UsersIcon },
    {
      label: "Applications",
      href: "/hireme/application/management",
      icon: ClipboardDocumentListIcon,
    },
    { label: "Tracker", href: "/tracker", icon: MagnifyingGlassIcon },
    { label: "Activity", href: "/activity", icon: BoltIcon },
  ];

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#f0f6fc] p-4 md:p-6">
      
      <AnimatePresence>
        {notification.message && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-6 right-6 z-50 px-4 py-2 rounded-md text-xs font-medium
              ${
                notification.type === "success"
                  ? "bg-[#196c2e] text-[#f0f6fc] border border-[#238636]"
                  : "bg-[#da3633] text-[#f0f6fc] border border-[#f85149]"
              }`}
          >
            {notification.message}
            <button
              className="ml-2 text-current opacity-70 hover:opacity-100"
              onClick={() => setNotification({ type: "", message: "" })}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#161b22] rounded-md p-4 mb-6 border border-[#30363d]"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-[#f0f6fc]">Admin Control Panel</h1>
            <p className="text-[#7d8590] mt-1 text-sm">Manage your content and users</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center px-3 py-1.5 rounded-md bg-[#21262d] hover:bg-[#30363d] transition-colors text-[#f0f6fc] font-medium text-xs whitespace-nowrap border border-[#30363d]"
              >
                <item.icon className="h-3.5 w-3.5 mr-1.5" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6"
      >
        <StatCard title="Users" value={users} icon={<UsersIcon className="h-4 w-4" />} />
        <StatCard title="Total Articles" value={totals?.totalArticles || 0} icon={<FileText className="h-4 w-4" />} />
        <StatCard title="Total Views" value={totals?.totalViews || 0} icon={<Eye className="h-4 w-4" />} />
        <StatCard title="Page Views" value={views?.length || 0} icon={<ChartBarIcon className="h-4 w-4" />} />
        <StatCard title="Messages" value={messages?.length || 0} icon={<ClipboardDocumentListIcon className="h-4 w-4" />} />
      </motion.div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#161b22] rounded-md p-4 mb-6 border border-[#30363d]"
      >
        <div className="flex gap-1 border-b border-[#30363d] overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#30363d] scrollbar-track-[#0d1117]">
          {["articles", "drafts", "trash", "messages"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 px-3 capitalize text-xs border-b-2 transition-all whitespace-nowrap
                ${
                  activeTab === tab
                    ? "border-[#1f6feb] text-[#f0f6fc] font-medium"
                    : "border-transparent text-[#7d8590] hover:text-[#f0f6fc]"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "articles" && (
            <Section title="Published Articles">
              {articles?.published?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {articles.published.map((article) => (
                    <ArticleCard
                      key={article._id}
                      article={article}
                      menuOpen={menuOpen}
                      setMenuOpen={setMenuOpen}
                      onEdit={() =>
                        router.push(`/v1/articles/update/${article.slug}`)
                      }
                      onPreview={() => router.push(`/blog/${article.slug}`)}
                      onAction={handleArticleAction}
                      actions={["edit", "unpublish", "delete"]}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState message="No published articles yet" />
              )}
            </Section>
          )}

          {activeTab === "drafts" && (
            <Section title="Drafts">
              {articles?.draft?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {articles.draft.map((article) => (
                    <ArticleCard
                      key={article._id}
                      article={article}
                      menuOpen={menuOpen}
                      setMenuOpen={setMenuOpen}
                      onEdit={() =>
                        router.push(`/v1/articles/update/${article.slug}`)
                      }
                      onPreview={() => router.push(`/preview/${article._id}`)}
                      onAction={handleArticleAction}
                      actions={["edit", "publish", "delete"]}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState message="No drafts found" />
              )}
            </Section>
          )}

          {activeTab === "trash" && (
            <Section title="Trash">
              {articles?.trash?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {articles.trash.map((article) => (
                    <ArticleCard
                      key={article._id}
                      article={article}
                      menuOpen={menuOpen}
                      setMenuOpen={setMenuOpen}
                      onPreview={() => router.push(`/preview/${article._id}`)}
                      onAction={handleArticleAction}
                      actions={["restore", "delete-permanent"]}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState message="Trash is empty" />
              )}
            </Section>
          )}

          {activeTab === "messages" && (
            <Section title="Messages">
              {messages?.length ? (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg._id} className="bg-[#0d1117] p-3 rounded-md border border-[#30363d]">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-[#f0f6fc] text-sm">{msg.name}</p>
                          <p className="text-xs text-[#7d8590]">{msg.email}</p>
                        </div>
                        <span className="text-xs text-[#7d8590]">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-2 text-[#7d8590] text-sm">{msg.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState message="No messages found" />
              )}
            </Section>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* Components */
const Section = ({ title, children }) => (
  <div className="space-y-3">
    <h2 className="text-lg font-medium text-[#f0f6fc]">{title}</h2>
    {children}
  </div>
);

const EmptyState = ({ message }) => (
  <div className="bg-[#0d1117] rounded-md p-6 text-center text-[#7d8590] text-sm border border-[#30363d]">
    <p>{message}</p>
  </div>
);

const ArticleCard = ({
  article,
  menuOpen,
  setMenuOpen,
  onEdit,
  onPreview,
  onAction,
  actions = [],
}) => {
  const actionIcons = {
    edit: <PencilIcon className="h-3.5 w-3.5 mr-2" />,
    preview: <EyeIcon className="h-3.5 w-3.5 mr-2" />,
    publish: <DocumentDuplicateIcon className="h-3.5 w-3.5 mr-2" />,
    unpublish: <EyeIcon className="h-3.5 w-3.5 mr-2" />,
    delete: <TrashIcon className="h-3.5 w-3.5 mr-2" />,
    restore: <ArrowUpTrayIcon className="h-3.5 w-3.5 mr-2" />,
    "delete-permanent": <TrashIcon className="h-3.5 w-3.5 mr-2 text-[#da3633]" />,
  };

  const actionLabels = {
    edit: "Edit",
    preview: "Preview",
    publish: "Publish",
    unpublish: "Unpublish",
    delete: "Move to Trash",
    restore: "Restore",
    "delete-permanent": "Delete Permanently",
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#0d1117] border border-[#30363d] rounded-md p-3 relative hover:border-[#3fb950] transition-all duration-200"
    >
      {/* Menu */}
      <div className="absolute top-2 right-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(menuOpen === article._id ? null : article._id);
          }}
          className="p-1 rounded-md hover:bg-[#21262d] text-[#7d8590] hover:text-[#f0f6fc] transition-colors"
        >
          <MoreVertical size={14} />
        </button>
        <AnimatePresence>
          {menuOpen === article._id && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute right-0 mt-1 w-40 bg-[#161b22] border border-[#30363d] shadow-lg py-1 rounded-md z-10"
            >
              {actions.map((action) => (
                <button
                  key={action}
                  onClick={() => {
                    if (action === "edit") onEdit();
                    else if (action === "preview") onPreview();
                    else onAction(article._id, action);
                  }}
                  className={`flex items-center w-full text-left px-3 py-1.5 text-xs hover:bg-[#1f6feb] transition-colors ${
                    action === "delete-permanent"
                      ? "text-[#da3633] hover:text-[#f0f6fc]"
                      : "text-[#f0f6fc]"
                  }`}
                >
                  {actionIcons[action]}
                  {actionLabels[action]}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="flex gap-3 items-start">
        {article?.featuredImage && (
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-16 h-16 object-cover rounded-md"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[#f0f6fc] text-sm truncate mb-1">
            {article.title}
          </h3>
          <div className="flex items-center text-[#7d8590] text-xs mb-1">
            <Calendar size={12} className="mr-1" />
            <span>
              {article.createdAt
                ? new Date(article.createdAt).toLocaleDateString()
                : "No date"}
            </span>
          </div>
          <div className="flex items-center text-[#7d8590] text-xs">
            <Eye size={12} className="mr-1" />
            <span>{article.views?.length || 0} views</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="bg-[#161b22] border border-[#30363d] rounded-md p-3 text-center"
  >
    <div className="flex justify-center items-center text-[#7d8590] mb-1">
      {icon}
    </div>
    <p className="text-[#7d8590] text-xs uppercase tracking-wide mb-1">{title}</p>
    <p className="text-lg font-semibold text-[#f0f6fc]">{value}</p>
  </motion.div>
);