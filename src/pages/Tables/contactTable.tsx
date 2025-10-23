import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ContactTable from "../../components/tables/BasicTables/ContactTable";

export default function ContactTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Contact List" />
      <div className="space-y-6">
        <ComponentCard title="contact">
          <ContactTable />
        </ComponentCard>
      </div>
    </>
  );
}
