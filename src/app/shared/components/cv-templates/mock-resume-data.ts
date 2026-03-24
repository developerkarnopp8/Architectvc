import { ResumeData } from '../../../core/models';

export const MOCK_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Ricardo Santos',
    jobTitle: 'Engenheiro de Software',
    city: 'São Paulo',
    state: 'SP',
    email: 'ricardo@email.com.br',
    phone: '(12) 3456-7890',
    linkedIn: 'linkedin.com/in/ricardo',
    github: 'github.com/ricardo',
    portfolio: 'www.ricardodev.com.br',
    about:
      'Engenheiro de software sênior com mais de 7 anos de experiência em desenvolvimento de soluções escaláveis. Especialista em arquitetura de sistemas e liderança técnica.',
    avatarUrl: '',
  },
  experiences: [
    {
      id: '1',
      jobTitle: 'Engenheiro de Software Sênior',
      company: 'Empresa Ícaro',
      startDate: 'Jul 2020',
      endDate: null,
      description:
        'Responsável por liderar equipes no ciclo de desenvolvimento de softwares de 10 projetos. Construí infraestrutura para milhões de arquivos de clientes.',
      bullets: [],
    },
    {
      id: '2',
      jobTitle: 'Engenheiro de Software Pleno',
      company: 'Galvão Internacional',
      startDate: 'Jan 2018',
      endDate: 'Jul 2020',
      description:
        'Apliquei práticas de segurança em novos produtos para alcançar 100% de compliance com as melhores práticas da indústria.',
      bullets: [],
    },
    {
      id: '3',
      jobTitle: 'Estagiário',
      company: 'Ribeiro, Farias e Sampaio S.A.',
      startDate: 'Jan 2017',
      endDate: 'Jul 2018',
      description:
        'Montagem e manutenção dos computadores, instalação de programas e configuração de rede interna.',
      bullets: [],
    },
  ],
  education: [
    {
      id: '1',
      degree: 'MBA em Data Science & Big Data',
      institution: 'Instituto Pense S.A.',
      startDate: '2020',
      endDate: '2021',
      description: 'Qualidade e Governança de Dados, Machine Learning.',
    },
    {
      id: '2',
      degree: 'Bacharelado em Engenharia de Software',
      institution: 'Universidade Pacheco e Lacerda',
      startDate: '2015',
      endDate: '2018',
      description: 'Desenvolvi minha paixão por programação.',
    },
  ],
  skills: [
    { id: '1', name: 'Trabalho em equipe' },
    { id: '2', name: 'Liderança' },
    { id: '3', name: 'Programação' },
    { id: '4', name: 'Resolução de problemas' },
    { id: '5', name: 'Machine Learning' },
    { id: '6', name: 'Cloud Services' },
  ],
  languages: [
    { id: '1', name: 'Português', level: 'nativo' },
    { id: '2', name: 'Espanhol', level: 'avançado' },
    { id: '3', name: 'Inglês', level: 'intermediário' },
  ],
  projects: [],
};
