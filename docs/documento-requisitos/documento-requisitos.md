## **1. Introdução**

Este documento apresenta os requisitos para o desenvolvimento do projeto BeSong, uma plataforma que visa conectar artistas do ramo da música com proprietários de estabelecimentos como restaurantes e bares ou particulares que desejam contratar seus serviços.

## **2. Requisitos Funcionais**

**RF01:** Cadastro de Artista.

**RF02:** Cadastro de Contratante.

**RF03:** Sistema de login para os usuários.

**RF04:** Perfil com o Portfólio do artista.

**RF05:** Visualização de um catálogo de artistas.

**RF06:** Ferramenta de filtragem de artistas.

## **3. Requisitos Não Funcionais**

**RNF01:** Estrutura que permita fácil expansão de funcionalidades futuras.

**RNF02:** O sistema deve ser intuitivo e fácil de usar.

**RNF03:** O sistema deve ser responsivo e funcionar em diferentes dispositivos.

**RNF04:** O sistema deve utilizar protocolos HTTPS.

**RNF05:** A estrutura do projeto deve ser de fácil manutenibilidade.

## **4. Produto Mínimo Viável (MVP)**

### **4.1. Principais Funcionalidades**

**Cadastro e Login:**

Permitir que músicos e contratantes se cadastrem.

Permitir que os usuários façam login.

Gerenciamento de sessões de usuários.

**Perfis de Usuários:**

Criação de perfis de músicos e contratantes.

Visualização do portfólio de artistas.

**Filtros e catálogo:**

Busca básica por artistas com critérios específicos

Catálogo dos artistas cadastrados na plataforma.

**Comunicação:**

Portfólio com meios de contato do artista.

Redirecionamento para redes sociais e meio de contato do artista.

### **4.2. Arquitetura do Sistema**

**Cliente-Servidor**

Arquitetura cliente-servidor com divisão clara entre Front-End e Back-End.

Utilização de APIs RESTful para comunicação entre cliente e servidor.

#### **4.2.1 Componentes Principais**

**Cliente:**

Navegador Web: Interface para usuários (músicos e contratantes).

Front-End: Exibição de informações e recebimento de entradas dos usuários.

**Servidor:**

Gerenciador de Autenticação.

Gerenciador de Perfis de Usuário.

Sistema de Busca e Filtros.

**Banco de Dados:**

Armazenamento de informações dos artistas, contratantes.

## **5. Considerações Finais**

O MVP do BeSong incluirá as funcionalidades essenciais para conectar artistas e contratantes, permitindo a criação de perfis, filtro de artistas, catálogo, portfólio. A arquitetura cliente-servidor facilitará a escalabilidade e manutenção do sistema.


| Versão | Data | Descrição da Alteração | Nome(s) Integrante(s) |
| :----: | :--: | :--------------------: | :-------------------: |
| 1.0 | 17/06/2024 | Criação do documento de requisitos | Brenno da Silva |

