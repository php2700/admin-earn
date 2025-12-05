import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import ReferAmounts from "../../components/tables/BasicTables/RefferAmount";

export default function ReferAmount() {
  return (
    <>
      <PageMeta
        title="amount"
        description="amount"
      />
      <PageBreadcrumb pageTitle="Refer Amount" />
      <div className="space-y-6">
        <ComponentCard title="Refer  Amount">
          <ReferAmounts />
        </ComponentCard>
      </div>
    </>
  );
}
