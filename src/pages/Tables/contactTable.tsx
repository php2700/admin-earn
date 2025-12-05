import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ContactTable from "../../components/tables/BasicTables/ContactTable";

export default function ContactTables() {
  return (
    <>
      <PageMeta
        title="contact"
        description="contact"
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
