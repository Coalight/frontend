import { Feature } from "../data/marketing-data";

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export const FeatureCard = ({ feature }: FeatureCardProps) => {
  const Icon = feature.icon;

  return (
    <div className="group relative rounded-xl border  hover:border-sky-300 dark:hover:border-sky-700 transition-all duration-200 shadow-sm hover:shadow-md overflow-hidden">
      <div className="h-full p-6 text-left">
        {/* Icon container */}
        <div className="flex items-center mb-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-background border  transition-colors duration-200 group-hover:border-sky-300 dark:group-hover:border-sky-800">
            <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300  transition-colors duration-200" />
          </div>
        </div>

        {/* Text content */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-200">
            {feature.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
};
