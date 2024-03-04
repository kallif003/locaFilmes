import { AuthorizationUser } from "@/utils/enum";
import { IInputWrappingStyle, IUseProps } from "@/utils/interfaces";
import { hasPermission } from "@/utils/permissions";

const useProps = (): IUseProps => {
  const setTableBackground = (index: number) => {
    if (index % 2 == 0) {
      return { background: "#F5f5f5" };
    }

    return { background: "#cccc" };
  };

  const setTotalPages = (pages: number): number[] => {
    const totalPages = [];

    for (let i = 0; i <= pages - 1; i++) {
      totalPages.push(i);
    }

    return totalPages;
  };

  const maskZipCode = (zipCode: string) => {
    zipCode = zipCode.replace(/\D/g, "");
    zipCode = zipCode.replace(/(\d{3})(\d)/, "$1.$2");
    zipCode = zipCode.replace(/(\d{3})(\d)/, "$1.$2");
    zipCode = zipCode.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return zipCode;
  };

  const handleAutoCompleteStyle = (value: string | undefined | null): any => {
    if (value) {
      return { background: "#fff", height: "3.5rem", fontWeight: "bold" };
    } else {
      return { background: "#f3f4f6", height: "3rem", fontWeight: "bold" };
    }
  };

  const inputWrappingStyle = () => {
    const style: IInputWrappingStyle[] = [
      {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        marginTop: "0.5rem",
        position: "relative",
        flexWrap: "wrap",
        minHeight: "",
      },
    ];

    if (hasPermission([AuthorizationUser.ADMIN])) {
      style[0].minHeight = "15rem";
    } else {
      style[0].minHeight = "8rem";
    }

    return style[0];
  };

  return {
    setTableBackground,
    setTotalPages,
    handleAutoCompleteStyle,
    inputWrappingStyle,
    maskZipCode,
  };
};

export default useProps;
