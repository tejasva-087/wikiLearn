import Achievements from "../components/Achievements";
import Sidebar from "../components/Sidebar";
import CertificateCard from "../components/CertificateCard";
import CourseStatusList from "../components/CourseStatusList";
import { ScrollArea } from "../components/ui/scroll-area";

// Define interface for certificate data
interface CertificateData {
  id: number;
  certificateName: string;
  userName: string;
  issueId: string;
  websiteUrl: string;
  logoUrl: string;
  userImageUrl: string;
  courses: {
    name: string;
    completed: boolean;
  }[];
}

function Certificate() {
  // Sample data for multiple certificates
  const certificates: CertificateData[] = [
    {
      id: 1,
      certificateName: "Fundamentals of Wikipedia",
      userName: "Tejasvi",
      issueId: "Issue id: WK-2023-001",
      websiteUrl: "www.wikiLearn.com",
      logoUrl:
        "https://storage.googleapis.com/a1aa/image/VzH5YHTC45IclS4jbg89fMMWUxqAAeNcBRDFhO5X_28.jpg",
      userImageUrl:
        "https://storage.googleapis.com/a1aa/image/dk4M0R4vAj0sOXI4bxq0t7CH8JyTjgsrEIkxJcTRze8.jpg",
      courses: [
        { name: "Five pillars of wikipedia", completed: true },
        { name: "Five pillars of wikipedia", completed: true },
        { name: "Five pillars of wikipedia", completed: false },
        { name: "Five pillars of wikipedia", completed: false },
      ],
    },
    
  ];

  return (
    <div>
      <div className="flex h-screen">
        {/* Side Bar */}
        <Sidebar />

        {/* Certificate content */}
        <div className="flex-1 bg-white border-1 shadow">
          <ScrollArea className="h-full">
            <div className="flex flex-col items-center pt-10 pb-20">
              <h1 className="text-3xl font-semibold mb-10 text-gray-700">
                Certificates
              </h1>

              <div className="w-full max-w-lg space-y-20">
                {certificates.map((cert) => (
                  <div key={cert.id} className="certificate-container">
                    <CertificateCard {...cert} />

                    <div className="mt-6">
                      <CourseStatusList courses={cert.courses} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Achievement Bar */}
        <Achievements />
      </div>
    </div>
  );
}

export default Certificate;
