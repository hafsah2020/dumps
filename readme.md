flowchart TD
    %% Stage 1: Target Audience
    subgraph A [Stage 1: Target Audience]
        A1[Analyze RTA\nRecommendations] %% Step: Analyze existing recommendations
        A2[Source & Add\nProspects]       %% Step: Collect and add prospects
    end

    %% Stage 2: Prospecting
    subgraph B [Stage 2: Prospecting]
        B1[Conduct Multi-\nChannel Outreach] %% Step: Reach out via email, calls, etc.
        B2[Track & Update\nStatus]           %% Step: Update CRM/status
    end

    %% Stage 3: Lead Qualification
    subgraph C [Stage 3: Lead Qualification]
        C1[Follow Up &\nSchedule Demos] %% Step: Contact leads and set demos
        C2[Quality Leads\nBANT/Criteria] %% Step: Qualify leads based on criteria
    end

    %% Stage 4: Opportunity Management
    subgraph D [Stage 4: Opportunity Management]
        D1[Prepare & Send\nProposals]    %% Step: Send proposals to qualified leads
        D2[Negotiate &\nProgress Deal]  %% Step: Close deals / negotiate terms
    end

    %% Stage 5: Customer Acquisition
    subgraph E [Stage 5: Customer Acquisition]
        E1[Onboard New\nCustomers] %% Step: Set up accounts / start service
        E2[Track Initial\nRevenue] %% Step: Monitor early revenue
    end

    %% Stage 6: Retention & Growth
    subgraph F [Stage 6: Retention & Growth]
        F1[Engage, Upsell,\nRenew] %% Step: Retain and grow customer relationships
        F2[Gather\nFeedback]       %% Step: Collect feedback for improvement
    end

    %% Connecting stages
    A --> B --> C --> D --> E --> F