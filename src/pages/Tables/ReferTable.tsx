import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ReferTable from "../../components/tables/BasicTables/ReferTable";

export default function ReferTables() {
  return (
    <>
      <PageMeta
        title="refer"
        description="refer"
      />
      <PageBreadcrumb pageTitle="Withdraw Req List" />
      <div className="space-y-6">
        <ComponentCard title="Withdraw Req List">
          <ReferTable />
        </ComponentCard>
      </div>
    </>
  );
}
