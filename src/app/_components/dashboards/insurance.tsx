import * as React from "react";
import { playfairDisplay } from "@/app/_lib/utils";
import { Insurance } from "@/app/_lib/types";
import { InsuranceClaimService } from "@/app/_lib/services/mongoose";
import { InsurancePlanTile } from "..";
import { useAppProvider } from "@/app/providers";

const InsuranceDashboard = () => {
  const [insurancePlan, setInsurancePlan] = React.useState<
    Insurance[] | undefined
  >([]);
  const {
    state: { user },
  } = useAppProvider();

  const approveInsurance = (id: string) => {
    const insuranceService = new InsuranceClaimService();
    const selectedInsurance = insurancePlan?.find((plan) => plan.id === id);
    insuranceService
      .updateInsuranceClaim({ ...selectedInsurance, status: "approved" } as Insurance)
      .then((response) => {
        alert("Insurance claim approved");
        setInsurancePlan(insurancePlan?.filter((plan) => plan.id !== id));
        console.log(response);
      });
  };
  const rejectInsurance = (id: string) => {
    const insuranceService = new InsuranceClaimService();
    
    const selectedInsurance = insurancePlan?.find((plan) => plan.id === id);
    insuranceService
      .updateInsuranceClaim({ ...selectedInsurance, status: "rejected" } as Insurance)
      .then((response) => {
        alert("Insurance claim rejected");
        setInsurancePlan(insurancePlan?.filter((plan) => plan.id !== id));
        console.log(response);
      });
  };

  React.useEffect(() => {
    const insuranceService = new InsuranceClaimService();
    const fetch = () => {
      insuranceService
        .getInsuranceClaimByField("provider", user?.id)
        .then((response: Insurance[] | undefined) => {
          response = response?.filter(
            (insurance) => insurance.status === "pending"
          );
          setInsurancePlan(response);
        });
    };

    fetch();
  }, []);

  return (
    <div
      className="w-full flex flex-col items-center justify-start"
      style={{
        height: "calc(100vh - 70px)",
      }}
    >
      <span
        className={`${playfairDisplay.className} md:text-5xl text-4xl mt-16 mb-16`}
      >
        Approve Insurance
      </span>
      <div className="flex-1 max-w-[550px]">
        {insurancePlan?.map((plan, index) => (
          <InsurancePlanTile
            key={plan.id}
            provider={plan.provider}
            date={plan.date}
            amount={plan.amount}
            detail={plan.detail}
            id={plan.id}
            status={plan.status}
            claimant={plan.claimant}
            patient={plan.patient}
            approveInsurance={approveInsurance}
            rejectInsurance={rejectInsurance}
            createdAt={plan.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default InsuranceDashboard;
