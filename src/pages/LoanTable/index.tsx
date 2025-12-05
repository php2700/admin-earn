import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import LoanTable from "../../components/tables/BasicTables/loanTable";

export default function LoanTables() {
  return (
    <>
      <PageMeta
        title="loan"
        description="loan"
      />
      <PageBreadcrumb pageTitle="Loan Applications" />
      <div className="space-y-6">
        <ComponentCard title="Loan Applications List">
          <LoanTable />
        </ComponentCard>
      </div>
    </>
  );
}

