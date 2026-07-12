import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Seo from '../components/common/Seo';
import SectionTitle from '../components/common/SectionTitle';

const FootballAcademy = () => {
  const { t } = useTranslation();
  const programLinks = [
    { path: '/football-academy/football', label: t('home.programs.items.football.title') },
    { path: '/football-academy/womens-football', label: t('home.programs.items.womensFootball.title') },
    { path: '/football-academy/basketball', label: t('home.programs.items.basketball.title') },
    { path: '/football-academy/volleyball', label: t('home.programs.items.volleyball.title') },
    { path: '/football-academy/table-tennis', label: t('home.programs.items.tableTennis.title') },
    { path: '/football-academy/german-classes', label: t('home.programs.items.germanClasses.title') },
  ];
  return (
    <div>
      <Seo path="/football-academy" />
      <section className="relative min-h-[45vh] sm:min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-primary/80 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('footballAcademy.hero.title')}</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            {t('footballAcademy.hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title={t('footballAcademy.section.title')} subtitle={t('footballAcademy.section.subtitle')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programLinks.map((program) => (
              <Link
                key={program.path}
                to={program.path}
                className="group block rounded-3xl border border-gray-100 p-8 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
                aria-label={`View details for ${program.label}`}
              >
                <h2 className="text-2xl font-semibold text-primary mb-3">{program.label}</h2>
                <p className="text-gray-600">{t('footballAcademy.cardDescription', { program: program.label })}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FootballAcademy;
