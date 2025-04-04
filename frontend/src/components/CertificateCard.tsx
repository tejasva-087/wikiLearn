import React from "react";

interface CertificateCardProps {
  certificateName: string;
  userName: string;
  issueId: string;
  websiteUrl: string;
  logoUrl: string;
  userImageUrl: string;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificateName,
  userName,
  issueId,
  websiteUrl,
  logoUrl,
  userImageUrl,
}) => {
  return (
    <div className="bg-white rounded-lg p-8 border-2 border-gray-300 shadow-md">
      <div className="flex items-center mb-10">
        <img
          src={logoUrl}
          alt="WikiLearn logo"
          className="mr-2"
          width="50"
          height="50"
        />
        <span className="text-2xl font-semibold">
          <span className="text-blue-600">Wiki</span>Learn
        </span>
      </div>

      <h2 className="text-3xl font-semibold mb-8 text-center">
        {certificateName}
      </h2>

      <div className="flex items-center justify-center mb-10">
        <img
          src={userImageUrl}
          alt={`Profile picture of ${userName}`}
          className="w-16 h-16 rounded-full mr-3"
        />
        <span className="text-xl">{userName}</span>
      </div>

      <div className="flex justify-between text-gray-500 text-sm mb-2">
        <div>{issueId}</div>
        <div>{websiteUrl}</div>
      </div>
    </div>
  );
};

export default CertificateCard;
