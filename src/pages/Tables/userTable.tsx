import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import UserTable from "../../components/tables/BasicTables/userTable";

export default function UserTables() {
  return (
    <>
      <PageMeta
        title="user"
        description="user"
      />
      <PageBreadcrumb pageTitle="User List" />
      <div className="space-y-6">
        <ComponentCard title="users">
          <UserTable />
        </ComponentCard>
      </div>
    </>
  );
}
